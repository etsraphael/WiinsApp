import { resetAllRefMusic } from './cache-music-service'
import { resetAllRefTube } from './cache-tube-service'

export async function resetCacheForDev() {
    await resetAllRefMusic()
    await resetAllRefTube()
}