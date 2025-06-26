<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Toaster, toast } from 'vue-sonner'



// code 来自plugin.json	"features": [{"code": "图床","explain": "上传图片","cmds": ["图床", "图"]}, 输入cmd 得到的code
const code = ref("");
const enterAction = ref({});


try {
	onMounted(() => {
		window.utools.onPluginEnter((action) => {
			console.log('action:', action)

			code.value = action.code;
			enterAction.value = action;
		});
		window.utools.onPluginOut((isKill) => {
			code.value = "";
		});
	});
} catch (error) {
	console.log('error:', error)
}
</script>

<template>
	<Toaster />

	<template v-if="code === 'picture'">
		<Hello :enterAction="enterAction"></Hello>
	</template>
	<template v-if="code === 'read'">
		<Read :enterAction="enterAction"></Read>
	</template>
	<template v-if="code === 'write'">
		<Write :enterAction="enterAction"></Write>
	</template>
	<template v-if="!code">
		<div class="p-4 text-center">
			<p>等待插件启动...</p>
		</div>
	</template>



</template>
