import { resetAllRefMusic } from './cache-music-service'

export async function resetCacheForDev() {
    await resetAllRefMusic()
}