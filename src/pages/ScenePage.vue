<template>
  <div style="margin-top: 5%; margin-left: 10%; margin-right: 10%">
    <qu-row>
      <qu-cols :span="4">
        <qu-card style="width: 70%; margin-left: 15%; background-color: #606060" shadow="hover">
          <div align="center" style="color: white">
            <router-link to="/DimensionExpansion">
              <p style="color: white;">尺寸拓展</p>
            </router-link>
          </div>
        </qu-card>
      </qu-cols>
      <qu-cols :span="4">
        <qu-card style="width: 70%; margin-left: 15%; background-color: #606060" shadow="hover">
          <div align="center" style="color: white">更多场景<br>敬请期待</div>
        </qu-card>
      </qu-cols>
    </qu-row>
  </div>
</template>

<script>
export default {
  name: 'ScenePage'
}
</script>

<style scoped>

</style>
