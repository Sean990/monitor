
function set(key,val){
	 uni.setStorageSync(key, val);
}

function get(key){
	return uni.getStorageSync(key);
}

function remove(key){
	 uni.removeStorageSync(key);
}

export default{
	set,
	get,
	remove
}