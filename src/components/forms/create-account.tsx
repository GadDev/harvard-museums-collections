'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { CURRENCIES } from '@/lib/constants/currencies'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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

import { Account } from '@/services/types/Account'
import { addAccount } from '@/services/account'

import { validationSchema } from './validation/account'

type CreateAccountFormValues = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>

const CreateAccountForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useForm<CreateAccountFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      accountType: '',
      currency: '',
      balance: 0,
      ownerId: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addAccount,
    onSuccess: async (data) => {
      form.reset()
      toast({
        title: 'Account created!',
        description: 'Your account has been created successfully.',
      })
      queryClient.refetchQueries({ queryKey: ['accounts'], type: 'active' })
      router.push(`/accounts/${data?.id}`)
    },
    onError: (error) => {
      toast({
        title: 'An error occurred.',
        description: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<CreateAccountFormValues> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectUsersField control={form.control} />
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
              <FormDescription>
                This is the name of your account.
              </FormDescription>
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
              <FormDescription>
                This is the number of your account.
              </FormDescription>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          )}
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
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

CreateAccountForm.displayName = 'CreateAccountForm'

export { CreateAccountForm }
