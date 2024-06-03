'use client'

import { useQuery } from '@tanstack/react-query'
import { Error } from '@/components/error'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAccounts } from '@/services/account'
import { Account } from '@/services/types/Account'
import { formattedCurrency } from '@/lib/utils'

const SelectAccountsField = ({
  control,
  name,
  label = '',
  placeholder = 'Select account',
  isDisabled = false,
  accountToExclude = null,
  hasBalanceInfo = false,
}: {
  control: any
  name: string
  label?: string
  isDisabled?: boolean
  placeholder?: string
  accountToExclude?: string | null
  hasBalanceInfo?: boolean
}) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAccounts(),
    queryKey: ['accounts'],
  })

  if (isLoading)
    return (
      <div className="flex flex-1 items-center">
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
        Loading...
      </div>
    )

  if (isError) return <Error />

  const optionValue = (hasBalanceInfo: boolean, account: Account) => (
    <>
      {account.name} - {account.currency} - {account.accountNumber}
      {hasBalanceInfo &&
        ` - ${formattedCurrency(account.balance, account.currency)}`}
    </>
  )

  return (
    <FormField
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              disabled={isDisabled}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {accountToExclude
                  ? data
                      ?.filter((a) => a.id !== accountToExclude)
                      .map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {optionValue(hasBalanceInfo, account)}
                        </SelectItem>
                      ))
                  : data?.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {optionValue(hasBalanceInfo, account)}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

SelectAccountsField.displayName = 'SelectUsersField'

export { SelectAccountsField }
