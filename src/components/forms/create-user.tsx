'use client'

import { useRouter, redirect } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
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

import type { User } from '@/services/types/User'
import { addUser } from '@/services/user'

import { validationSchema } from './validation/user'

type CreateUserFormValues = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

const CreateUserForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useForm<CreateUserFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const { mutate, isPending, data } = useMutation({
    mutationFn: addUser,
    onSuccess: async (data) => {
      form.reset()
      toast({
        title: 'User created!',
        description: 'User has been created successfully.',
      })
      queryClient.refetchQueries({ queryKey: ['users'], type: 'active' })
      router.push(`/users/${data?.id}`)
    },
    onError: (error) => {
      toast({
        title: 'An error occurred.',
        description: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<CreateUserFormValues> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Please provide an first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Please provide an last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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

CreateUserForm.displayName = 'CreateUserForm'

export { CreateUserForm }
