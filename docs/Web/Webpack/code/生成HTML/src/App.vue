<template>
	<div>
		<h1>{{message}}</h1>
	</div>
</template>

<!--  lang = ts 是为了指明代码是 Typescript 语法  -->
<script lang="ts">
	import Vue from 'vue';
	// 通过 Vue.extend 启用 TypeScript 类型推断
	export default Vue.extend({
		data(){
			return{
				message:'Hello Typescript In Vue'
			}
		}
	})
</script>
<style scoped lang="scss">
	@import '~@/assets/main.scss';
	h1{
		color: red;
		text-align: center;
	}
</style>