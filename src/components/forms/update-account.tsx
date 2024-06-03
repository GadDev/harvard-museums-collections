'use client'

import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { CURRENCIES } from '@/lib/constants/currencies'
import type { Account } from '@/services/types/Account'
import { updateAccount } from '@/services/account'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { SelectUsersField } from './fields/select-users-fields'

import { validationSchema } from './validation/account'

type UpdateAccountFormValues = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>

const UpdateAccountForm = ({ account }: { account: Account }) => {
  const queryClient = useQueryClient()

  const initialValues = {
    name: account.name,
    accountNumber: account.accountNumber,
    accountType: account.accountType,
    currency: account.currency,
    balance: account.balance,
    ownerId: account.ownerId,
  }

  const form = useForm<UpdateAccountFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const { mutate, isPending } = useMutation<
    Account,
    Error,
    {
      id: string
      account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>
    }
  >({
    mutationFn: ({ id, account }) => updateAccount(id, account),
    onSuccess: async () => {
      form.reset()
      toast({
        title: 'Account updated!',
        description: 'Your account has been updated successfully.',
      })
      queryClient.refetchQueries({
        queryKey: ['accounts', `${account.id}`],
        type: 'active',
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'An error occurred.',
        description: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<UpdateAccountFormValues> = (values) => {
    mutate({ id: account.id, account: values })
    form.reset(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectUsersField isDisabled={true} control={form.control} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please provide an account name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please provide an account number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Checking">Checking</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => {
            const handleChange = (value: string) => {
              const currencySelected = value
              const rates: Record<string, number> = CURRENCIES.find(
                (currency) => currency.code === account.currency,
              )?.rates as any
              const newBalance =
                account.balance * (rates[currencySelected] || 1)

              form.setValue('balance', parseFloat(newBalance.toFixed(2)))
              field.onChange(value)
            }
            return (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={(value) => handleChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

UpdateAccountForm.displayName = 'UpdateAccountForm'

export { UpdateAccountForm }
