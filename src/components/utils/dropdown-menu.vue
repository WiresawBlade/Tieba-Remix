<template>
    <div class="dropdown-menu" :class="blurEffect ? 'blur-effect' : ''">
        <template v-for="menuItem in props.menuItems">
            <template v-if="typeof menuItem === 'string'">
                <div class="menu-separator"></div>
            </template>

            <template v-else>
                <a class="menu-item" :href="menuItem.href ? menuItem.href : 'javascript:;'" @click="menuItem.click"
                    :target="menuItem.href ? '_blank' : ''">
                    <div v-if="menuItem.icon" class="icon">{{ menuItem.icon }}</div>
                    <div>{{ menuItem.title }}</div>
                </a>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { findParentByClass } from '@/lib/domlib';
import { onMounted } from 'vue';


interface Props {
    menuItems: DropdownMenu[],
    blurEffect?: true
}
const props = defineProps<Props>();

const emit = defineEmits(["RequestClose"]);

onMounted(() => {
    // 设置等待时长，防止刚挂载就被卸载
    setTimeout(() => {
        window.addEventListener("click", () => {
            setTimeout(() => {
                emit("RequestClose");
            }, 100);
        });

        window.addEventListener("focusin", (ev) => {
            if (!findParentByClass((ev.target as HTMLElement), "dropdown-menu")) {
                emit("RequestClose");
            }
        });
    }, 100);
});
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;
@use "@/stylesheets/main/remixed-main" as _main;

@keyframes stretch {
    0% {
        padding: 2px 14px;
    }

    100% {
        padding: 8px 14px;
    }
}

a {
    color: unset;
}

.dropdown-menu {
    position: fixed;
    z-index: 1;
    display: flex;
    overflow: hidden;
    min-width: 120px;
    flex-direction: column;
    border: 1px solid _.$borderColor;
    border-radius: 8px;
    background-color: _.$defaultBack;
    box-shadow: 0 0 20px rgb(0 0 0 / 8%);
    font-size: 14px;

    @include _main.fade-in(0.1s);

    .menu-item {
        display: flex;
        align-items: center;
        padding: 8px 14px;
        animation: stretch 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
        gap: 6px;
    }

    .menu-item:hover {
        background-color: _.$defaultHover;
    }

    .menu-item:active {
        background-color: _.$defaultActive;
    }

    .menu-separator {
        height: 1px;
        margin-top: 6px;
        margin-bottom: 6px;
        background-color: _.$borderColor;
    }
}

.blur-effect {
    background-color: _.$transDefaultBack;

    @include _main.blur-effect;
}
</style>
