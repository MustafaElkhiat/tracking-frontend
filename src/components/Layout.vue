<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->

    <Sidebar/>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <NavBar/>
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->
</template>

<script>
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "./NavBar/NavBar";
export default {
  name: "Layout",
  components: {NavBar, Sidebar},


};
</script>

<style>
body {
  overflow-x: hidden;
}

#page-content-wrapper {
  min-width: 100vw;
}


@media (min-width: 768px) {
  /* #sidebar-wrapper {
    margin-left: 0;
  } */

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
}
</style>