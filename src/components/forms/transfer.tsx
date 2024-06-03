'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import type { Transfer } from '@/services/types/Transfer'
import { transferFunds } from '@/services/account'

import { validationSchema } from './validation/transfer'
import { SelectAccountsField } from './fields/select-accounts-fields'

type TransferFormValues = Omit<
  Transfer,
  'description' | 'executedAt' | 'currency'
>

const TransferFundsForm = ({
  fromAccount = '',
  hasBalanceInfo = false,
}: {
  fromAccount?: string
  hasBalanceInfo?: boolean
}) => {
  const queryClient = useQueryClient()
  const form = useForm<TransferFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fromAccountId: fromAccount,
      toAccountId: '',
      amount: 0,
    },
    
  })

  const { mutate, isPending } = useMutation({
    mutationFn: transferFunds,
    onSuccess: async () => {
      toast({
        title: 'Funds transferred!',
      })
      queryClient.refetchQueries({
        queryKey: ['accounts'],
        type: 'active',
      })
      form.reset(undefined, { keepDirtyValues: true })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<TransferFormValues> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectAccountsField
          name="fromAccountId"
          placeholder="From"
          hasBalanceInfo={hasBalanceInfo}
          control={form.control}
          isDisabled={!!fromAccount}
        />
        <SelectAccountsField
          name="toAccountId"
          placeholder="To"
          control={form.control}
          hasBalanceInfo={hasBalanceInfo}
          accountToExclude={form.getValues('fromAccountId')}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Transfer amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Transfer'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

TransferFundsForm.displayName = 'TransferFundsForm'

export { TransferFundsForm }
