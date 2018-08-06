<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      
      <router-link to="/home" class="navbar-brand">
        <img src="./assets/searchLogo.png"></img>
      </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/query" class="nav-link">Query</router-link>
          </li>
        </ul>
      </div>
    </nav>    
 
    <router-view/>
  </div>
</template>
