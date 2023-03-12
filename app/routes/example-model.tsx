import { Button, Icon } from '../components'

/**
 * Temporary route to demonstrate hosting an AR model.
 */
export default function ExampleModel() {
  return (
    <div className="p-3 flex items-center justify-center">
      <Button data-testid="ExampleModel.Link" href="/ar/toy_drummer_idle.usdz">
        View model in AR
      </Button>
    </div>
  )
}
