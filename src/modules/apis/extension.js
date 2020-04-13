import * as browser from 'webextension-polyfill'

export const changeStatus = async (value) => {
    const config = await browser.storage.sync.get()
    await browser.storage.sync.set({
        ...config,
        status: value
    })
}