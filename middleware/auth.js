export default function({ store, route, redirect }) {
  const user = store.state.enduser.user;
  const blockloginRoute = /\/login\/*/g;
  const blocksignupRoute = /\/registration\/*/g;
  const homeRoute = "/";
  // const isLoginPage = route.fullPath === '/admin/login'
  // console.log(" user in middleware =>",user)
  if (!user && route.path.match(blockloginRoute)) {
    return;
  } else if (!user && route.path.match(blocksignupRoute)) {
    return;
  } else if (!user && route.path === homeRoute) {
    return;
  } else if(user) {
    if (user && route.path.match(blockloginRoute)) {
      redirect(`/users/${user.username}`);
    }
    if (user && route.path.match(blocksignupRoute)) {
      redirect(`/users/${user.username}`);
    }
    if (user && route.path === homeRoute) {
      redirect("/home");
    }
  }else{
    redirect("/");
  }
  // if (!user && route.path.match(blocksignupRoute))
  // if (!user && route.path === homeRoute) return

  //   if (route.path.match(blocksignupRoute) && !user) {
  //       redirect("/registration");
  //   }
  //   if (route.path === homeRoute && !user) {
  //     redirect("/");
  // }
  // if (!user) {
  //   redirect("/login");
  // }
  // if (user && route.path.match(blockloginRoute)) {
  //   redirect(`/users/${user.username}`);
  // }
  // if (user && route.path.match(blocksignupRoute)) {
  //   redirect(`/users/${user.username}`);
  // }
  // if (user && route.path === homeRoute) {
  //   redirect("/home");
  // }
}
