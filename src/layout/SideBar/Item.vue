<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import { get } from 'lodash'
import { useRouter } from 'vue-router'
import path from 'path-browserify'

const router = useRouter()
let onlyOneChild = ref(null)
let hasOneShowingChild = ref(false)
const props = defineProps({
  item: Object,
  base: String('')
})

if (props.item && props.item.children) {
  const showingChildren = props.item.children.filter(item => {
    if (item.hidden) {
      return
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    hasOneShowingChild.value = true
  }

  if (showingChildren.length === 0) {
    onlyOneChild = { ...props.item, path: props.item.path, noShowingChildren: true }
    hasOneShowingChild.value = true
  }
}

const resolvePath = (routePath) => {
  return path.resolve(props.base, routePath)
}

</script>

<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <a-menu-item
        v-if="onlyOneChild.meta"
        :key="resolvePath(onlyOneChild.path)"
        @click="router.push(resolvePath(onlyOneChild.path))"
      >
        <template #icon>
          <svg-icon :name="get(onlyOneChild, 'meta.icon') || get(item, 'meta.icon')" />
        </template>
        {{ get(onlyOneChild, 'meta.title') || get(item, 'meta.title') }}
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="item.path">
      <template v-if="item.meta" #icon>
        <svg-icon :name="item.meta.icon" />
      </template>
      <template v-if="item.meta" #title>
        {{ item.meta.title }}
      </template>
      <item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base="resolvePath(item.path)"
      />
    </a-sub-menu>
  </template>
</template>
