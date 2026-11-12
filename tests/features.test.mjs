import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

for (const environment of ['development', 'test', 'production']) {
  for (const flag of ['true', 'false', '']) {
    test(`cart preview: NODE_ENV=${environment}, flag=${JSON.stringify(flag)}`, () => {
      const actual = execFileSync(process.execPath, ['--input-type=module', '-e',
        "import { cartPreviewEnabled } from './lib/commerce/features.ts'; process.stdout.write(String(cartPreviewEnabled))",
      ], {
        cwd: new URL('..', import.meta.url),
        env: { ...process.env, NODE_ENV: environment, NEXT_PUBLIC_CART_PREVIEW: flag },
        encoding: 'utf8',
      })
      assert.equal(actual, String(environment === 'development' && flag === 'true'))
    })
  }
}
