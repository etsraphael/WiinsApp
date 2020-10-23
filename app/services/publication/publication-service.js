// creation of a publication
export function createPublication(props) {
        switch (props.screenMode) {
                case 'PostPublication': return createPostPublication(props)
                case 'PicturePublication': return createPicturePublication(props)
                case 'PublicationVideo': return createVideoPublication(props)
                default: return null
        }
}

// creation of story
export function createStoryPublication(props) {
        switch (props.screenMode) {
                case 'PostPublication': { props.screenMode = 'PostStory'; return createPostPublication(props) }
                case 'PicturePublication': { props.screenMode = 'PictureStory'; return createPicturePublication(props) }
                case 'PublicationVideo': { props.screenMode = 'VideoStory'; return createVideoPublication(props)  }
                default: return null
        }
}

// global creation
export async function createMetaPublication(publicationReceived) {

        let publicationMeta = {}
        publicationMeta.type = publicationReceived.screenMode
        publicationMeta.text = publicationReceived.textInput
        publicationMeta.space = 'profile'
        publicationMeta.savingDate = Date.now()

        if (publicationReceived.profileAuth.length > 0) {
                publicationMeta.profileTagged = publicationReceived.profileAuth.map(x => x._id)
        }

        if (publicationReceived.hastags.length > 0) {
                publicationMeta.hastags = publicationReceived.hastags
        }

        return publicationMeta
}

// post publication
export async function createPostPublication(publicationReceived) {

        let publicationMeta = await createMetaPublication(publicationReceived)

        return {
                ...publicationMeta,
                background: getbackgroudPublicationPostFromColor(publicationReceived.backgroundColorPost.colors)
        }
}

export function getbackgroudPublicationPostFromColor(backgroudColor) {


        switch (String(backgroudColor)) {
                case '#8d7ab5,#dc74ac,#ff7d78,#ffa931,#c0e003': {
                        return 'linear-gradient(to left bottom, #8d7ab5, #dc74ac, #ff7d78, #ffa931, #c0e003)'
                }
                case '#000000,#000000': {
                        return 'linear-gradient(to right top, #000000, #000000, #000000, #000000, #000000)'
                }
                case '#051937,#004d7a,#008793,#00bf72,#a8eb12': {
                        return 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)'
                }
                case '#ff0047,#2c34c7': {
                        return 'linear-gradient(45deg, #ff0047 0%, #2c34c7 100%)'
                }
                case '#282812,#4a3707,#7b3d07,#b43527,#eb125c': {
                        return 'linear-gradient(to right top, #282812, #4a3707, #7b3d07, #b43527, #eb125c)'
                }
                case '#17ea8a,#00c6bb,#009bca,#006dae,#464175': {
                        return 'linear-gradient(to left bottom, #17ea8a, #00c6bb, #009bca, #006dae, #464175)'
                }
        }
}

// picture publication
export async function createPicturePublication(publicationReceived) {


        let publicationMeta = await createMetaPublication(publicationReceived)

        return {
                ...publicationMeta,
                file: publicationReceived.pictureData
        }
}

// video publication
export async function createVideoPublication(publicationReceived) {

        let publicationMeta = await createMetaPublication(publicationReceived)

        return {
                ...publicationMeta,
                filePicture: publicationReceived.pictureData,
                fileVideo: publicationReceived.videoData
        }
}