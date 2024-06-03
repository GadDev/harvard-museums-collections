'use client'

import { useEffect } from 'react'
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

import type { User } from '@/services/types/User'
import { updateUser } from '@/services/user'

import { validationSchema } from './validation/user'

type UpdateUserFormValues = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

const UpdateUserForm = ({ user }: { user: User }) => {
  const queryClient = useQueryClient()

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
  }

  const form = useForm<UpdateUserFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, form])

  const { mutate, isPending } = useMutation<
    User,
    Error,
    {
      id: string
      user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
    }
  >({
    mutationFn: ({ id, user }) => updateUser(id, user),
    onSuccess: () => {
      form.reset()
      toast({
        title: 'User updated!',
        description: 'User has been updated successfully.',
      })
      queryClient.refetchQueries({
        queryKey: ['users', `${user.id}`],
        type: 'active',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<UpdateUserFormValues> = (values) => {
    mutate({ id: user.id, user: values })
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
              'Update'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

UpdateUserForm.displayName = 'UpdateUserForm'

export { UpdateUserForm }
