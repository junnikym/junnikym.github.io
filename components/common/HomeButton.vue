<template>
    <a class="home-btn blog-icon" href="/">
        <div class="home-btn-shadow blog-icon"></div></a>
</template>

<style scoped lang="scss">
.home-btn {
    margin: 0 20px;
    width: 56px;
    height: 34px;
    filter: invert(100%);
    transition: all ease-in-out 100ms;
    z-index: 2;
    
    &:hover {
        transform: translate(-2.25px, -2.25px) scale(1.05);
    }
    &:active {
        transform: translate(-1.25px, -1.25px) scale(0.95);
    }

    .home-btn-shadow {
        width: 100%;
        height: 100%;
        z-index: 1;
        filter: opacity(25%);
        transition: all ease-in-out 100ms;
        
        &:hover {
            transform: translate(2.25px, 2.25px) scale(1.05);
        }
        &:active {
            transform: translate(1.25px, 1.25px) scale(0.95);
        }
    }
    
}
</style>