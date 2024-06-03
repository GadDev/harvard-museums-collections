import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransferFundsForm } from '@/components/forms/transfer'

export default async function TransfersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Transfers management</CardTitle>
            </CardHeader>
            <CardContent>
              <TransferFundsForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
