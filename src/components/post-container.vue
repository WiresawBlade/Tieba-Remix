<template>
    <a ref="postContainer" class="post-container" :href="'/p/' + props.post.id" target="_blank">
        <div class="main-content">
            <a :href="props.post.forum.href" target="_blank">
                <UserButton class="forum" :title="props.post.forum.name + ' 吧'">
                </UserButton>
            </a>
            <p class="title">{{ props.post.title }}</p>
            <p class="content">{{ props.post.content }}</p>
        </div>

        <div class="img-container">
            <a v-for="image, index in props.post.images" href="javascript:;" @click="showImage(index)">
                <img class="post-img" :src="image.original">
            </a>
        </div>

        <div class="bottom-controls">
            <a :href="props.post.author.href" target="_blank">
                <UserButton class="author">
                    <img class="author-portrait" :src="tiebaAPI.profile(props.post.author.portrait)">
                    <div class="author-info">
                        <div class="author-name">{{ props.post.author.name }}</div>
                        <div class="post-time">{{ props.post.time }}</div>
                    </div>
                </UserButton>
            </a>
            <div class="replies">{{ props.post.replies }}</div>
        </div>
    </a>
</template>

<script setup lang="ts">
import { tiebaAPI } from "@/lib/api.tieba";
import UserButton from "./utils/user-button.vue";
import { ref } from "vue";
import { map } from "lodash-es";

interface Props {
    post: TiebaPost
    asyncLoad?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    asyncLoad: false
});

const emit = defineEmits(["ClickImage"]);

const postContainer = ref<HTMLAnchorElement>();

function showImage(index: number) {
    emit("ClickImage", (() => {
        const output: string[] = [];
        map(props.post.images, (value) => {
            output.push(value.original);
        });
        return output;
    })(), index);
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;

a {
    color: unset;
    text-decoration: none;
}

.post-container {
    display: flex;
    width: 360px;
    box-sizing: border-box;
    flex-direction: column;
    padding: 16px;
    border-radius: 16px;
    background-color: _.$defaultBack;
    cursor: pointer;
    text-align: justify;

    .main-content {
        .forum {
            border: none;
            border-radius: 24px;
            background-color: _.$lightBack;
        }

        .title {
            color: _.$highlightFore;
            font-weight: bold;
        }

        .content {
            font-size: small;
        }
    }

    .img-container {
        display: flex;
        overflow: hidden;
        flex-wrap: wrap;
        border-radius: 16px;
        gap: 6px;

        a {
            min-width: 40%;
            height: 144px;
            flex: 1;
        }

        .post-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .bottom-controls {
        display: flex;
        align-items: center;
        margin-top: 24px;
        gap: 12px;

        .author {
            display: flex;
            padding: 0;
            border: none;
            border-radius: 24px;

            .author-portrait {
                width: 32px;
                height: 32px;
                border-radius: 24px;
                object-fit: cover;
            }

            .author-info {
                display: flex;
                flex-direction: column;
                padding: 0 10px;
                text-align: left;

                .author-name {
                    font-weight: bold;
                }

                .post-time {
                    color: _.$minimalFore;
                    font-size: smaller;
                }
            }
        }

        .replies {
            display: flex;
            min-width: 16px;
            align-items: center;
            border-radius: 24px;
            margin-left: auto;
            color: _.$lightFore;
            font-size: small;
        }

        .replies::before {
            margin-right: 6px;
            content: "forum";
            font-family: "Material Icons", monospace;
            font-size: medium;
        }
    }
}

.post-container:hover {
    background-color: _.$defaultHover;
}
</style>
