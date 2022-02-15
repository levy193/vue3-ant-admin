import { findIndex, set } from 'lodash'

const clearRouter = router => {
  if (router.children && router.children.length > 0) {
    for (let i = router.children.length - 1; i >= 0; i--) {
      const isEmpty = clearRouter(router.children[i])
      if (isEmpty) {
        router.children.splice(i, 1)
      }
    }
  }

  if (
    router.children &&
    router.children.length < 1 &&
    router.meta &&
    router.meta.type === 'layout'
  ) {
    return true
  }

  return false
}

export default async function(appId, userRoles, roles) {
  const modules = (await import(`../views/${appId}/dynamic/router.config.js`)).default
  const appRouter = (await import(`../router/modules/${appId}.js`)).default

  const routers = {
    children: []
  }

  let permissions = []
  roles.forEach(role => {
    if (role.name.startsWith(appId) && userRoles.includes(role.name)) {
      permissions = permissions.concat(role.permissions)
    }
  })

  for (let router of modules) {
    const config = (await import(`../views/${appId}/dynamic/${router}.js`)).default

    let requestAccessModels = []
    if (config.view && config.view.models) {
      requestAccessModels = config.view.models.map(model => model.model)
    }

    let hasPermission = true
    if (!userRoles.includes('super-admin') && !userRoles.includes(`${appId}-admin`)) {
      requestAccessModels.forEach(requestAccessModel => {
        const pIndex = permissions.findIndex(v => {
          return v.model === requestAccessModel &&
            (
              v.methods.includes('*') ||
              v.methods.includes('get')
            )
        })

        if (pIndex < 0) {
          hasPermission = false
        }
      })
    }

    if (hasPermission) {
      let components = router.split('/')
      if (router.endsWith('index')) {
        components.pop()
      }
      const routerConfig = Object.assign(
        {
          children: [],
          id: `${appId}-${components[components.length - 1]}`
        },
        config.router
      )

      let selector = routers
      let route = ''
      for (let i = 0; i < components.length - 1; i++) {
        const index = findIndex(selector.children, d => d.id === components[i])
        selector = selector.children[index]
        route += `children[${index}]`
      }
      if (route.length > 0) {
        router += '.'
      }

      set(routers, `${route}children[${selector.children.length}]`, routerConfig)
    }
  }

  clearRouter(routers)

  appRouter.children = appRouter.children.concat(...routers.children)

  return appRouter
}
