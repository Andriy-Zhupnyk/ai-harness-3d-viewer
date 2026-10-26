import { expect, test } from '@playwright/test'

test('renders a WebGL canvas with no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('/')

  const canvas = page.locator('canvas')
  await expect(canvas).toBeVisible()

  const hasWebGL = await canvas.evaluate((el) => {
    const c = el as HTMLCanvasElement
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  })
  expect(hasWebGL).toBe(true)
  expect(errors).toEqual([])
})

test('dragging the canvas rotates the view (camera position changes)', async ({ page }) => {
  await page.goto('/')
  const canvas = page.locator('canvas')
  await expect(canvas).toBeVisible()

  await page.waitForFunction(() => Boolean(window.__viewerDebug))

  const before = await page.evaluate(() => window.__viewerDebug!.getCameraPosition())

  const box = await canvas.boundingBox()
  if (!box) throw new Error('canvas has no bounding box')
  const centerX = box.x + box.width / 2
  const centerY = box.y + box.height / 2

  await page.mouse.move(centerX, centerY)
  await page.mouse.down()
  await page.mouse.move(centerX + 180, centerY + 60, { steps: 20 })
  await page.mouse.up()

  // OrbitControls damping needs a few animation frames to settle.
  await page.waitForTimeout(300)

  const after = await page.evaluate(() => window.__viewerDebug!.getCameraPosition())

  expect(after).not.toEqual(before)
})
