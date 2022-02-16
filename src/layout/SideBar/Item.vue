<script setup>
import { ref, defineProps } from 'vue'
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import { get } from 'lodash'

let onlyOneChild = ref(null)
let hasOneShowingChild = ref(false)
const props = defineProps({
  item: Object
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
</script>

<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="onlyOneChild.path">
        <a-menu-item
          :key="item.path"
        >
          <template #icon>
            <svg-icon :name="get(onlyOneChild, 'meta.icon') || get(item, 'meta.icon')" />
          </template>
          {{ get(onlyOneChild, 'meta.title') || get(item, 'meta.title') }}
        </a-menu-item>
      </router-link>
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
      />
    </a-sub-menu>
  </template>
</template>