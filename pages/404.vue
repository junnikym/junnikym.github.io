<template>
    <div>

        <nav>
            <HomeButton class="home-btn" />
        </nav>

        <section class="wrapper">

            <div class="container">

                <div id="scene" class="scene" data-hover-only="false">


                    <div class="circle" data-depth="1.2"></div>

                    <div class="one" data-depth="0.9">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>
                    <div class="two" data-depth="0.60">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>
                    <div class="three" data-depth="0.40">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>

                </div>

                <div class="text">
                    <article>
                        <p class="p404" data-depth="0.50">404</p>
                        <p class="p404" data-depth="0.10">404</p>
                        <p>NOT FOUND PAGE</p>
                        <a class="go-honme" href="/">GO HOME</a>
                    </article>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
import HomeButton from "@/components/common/HomeButton.vue";

export default {
  name: "Header",
  components: { HomeButton },
};
</script>

<style scoped lang="scss">

@import "@/assets/scss/colors.scss";
@import "@/assets/scss/icons.scss";
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

$font-01: "Barlow",
sans-serif;
$font-02: "Barlow Condensed",
sans-serif;

$m-01: #FB8A8A;
$g-01: linear-gradient(90deg, #FFEDC0 0%, #FF9D87 100%);
$g-02: linear-gradient(90deg, #8077EA 13.7%, #EB73FF 94.65%);

$cubic: cubic-bezier(0.4, 0.35, 0, 1.53);
$cubic2: cubic-bezier(0.18, 0.89, 0.32, 1.15);

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
button,
a,
i,
input,
body {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 0;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    color: inherit;

    &:focus {
        outline: 0;
    }
}


body {
    margin: 0;
    padding: 0;
    height: auto;
    font-family: $font-01;
    background: $lighter-color;

}


nav {
    .home-btn {
        position: absolute;
        left: 25px; top: 25px;
        width: 56px; height: 34px;
        filter: invert(0%);
    }
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-x: hidden;

    .container {
        margin: 0 auto;
        transition: all 0.4s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        // Scene for the Parallax Effect
        .scene {
            position: absolute;
            width: 100vw;
            height: 100vh;
            vertical-align: middle;
        }

        // All elements' containers
        .one,
        .two,
        .three,
        .circle,
        .p404 {
            width: 100%;
            height: 100%;
            margin: 0; padding: 0;
            min-width: 300px;
            min-height: 300px;

            .content {
                width: 78vw;
                max-width: calc(100vh * 0.78);
                aspect-ratio: 1 / 1;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

                @keyframes content {
                    0% {
                        width: 0;
                    }
                }

                // Pieces
                .piece {
                    width: 26vw;
                    max-width: calc(100vh * 0.26);
                    aspect-ratio: 4 / 1;
                    display: flex;
                    position: absolute;
                    border-radius: calc(26vw / 4);
                    z-index: 1;

                    animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;


                    @keyframes pieceLeft {
                        0% {}

                        50% {
                            left: 80%;
                            width: 10%;
                        }

                        100% {}

                    }

                    @keyframes pieceRight {
                        0% {}

                        50% {
                            right: 80%;
                            width: 10%;
                        }

                        100% {}

                    }

                }
            }
        }

        // Text and Button container
        .text {
            position: absolute;
            width: 50vw;
            max-width: calc(100vh * 0.5);
            aspect-ratio: 1 / 1;
            animation: text 0.6s 1.8s ease backwards;

            @keyframes text {
                0% {
                    opacity: 0;
                    transform: translateY(40px);
                }
            }

            article {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);

                p {
                    position: absolute;
                    top: 58%;
                    color: white;
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 0.6px;
                    margin-bottom: 40px;
                    text-shadow: 3px 3px 10px $dark-color;
                }

                .go-honme {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    top: 76%;
                    height: 40px;
                    padding: 0 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    box-shadow: 0px 15px 20px rgba($less-light-color, 0.5);
                    z-index: 3;
                    color: $lightest-color;
                    background-color: $less-light-color;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-size: 12px;
                    transition: all 0.3s ease;

                    &:hover {
                        box-shadow: 0px 10px 10px -10px rgba($less-light-color, 0.5);
                        transform: translateY(5px);
                        background: $main-color;
                        color: white;
                    }
                }

                .p404 {
                    top: 20%;
                    font-size: calc(100vw * 0.125);
                    font-weight: 700;
                    letter-spacing: 4px;
                    color: white;
                    display: flex !important;
                    justify-content: center;
                    position: absolute;
                    z-index: 2;
                    animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
                    animation-delay: 1.2s;
                    box-shadow: none;

                    @keyframes anime404 {
                        0% {
                            opacity: 0;
                            transform: translateY(40px);
                        }
                    }

                    &:nth-of-type(2) {
                        color: $dark-color;
                        z-index: 1;
                        animation-delay: 1s;
                        opacity: 0.8;
                    }


                }
            }
        }

        // Bigger Circle
        .circle {
            position: absolute;
            margin: 0; padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            &:before {
                content: '';
                position: relative;
                margin: 0; padding: 0;
                width: 82vw;
                max-width: (70vh * 0.82);
                aspect-ratio: 1 / 1;
                border-radius: 15px;
                background-color: rgba($less-light-color, 0.1);
                box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;;
                animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;


                @keyframes circle {
                    0% {
                        width: 0;
                        height: 0;
                    }
                }
            }
        }

        // Container 1
        .one {
            .content {

                // Smaller Circle
                &:before {
                    content: '';
                    position: absolute;
                    margin: 0; padding: 0;
                    width: 68vw;
                    max-width: (70vh * 0.68);
                    aspect-ratio: 1 / 1;
                    border-radius: 15px;
                    background-color: rgba($less-light-color, 0.2);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
                    animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;
                }

                .piece {
                    background: $g-02;

                    &:nth-child(1) {
                        right: 15%;
                        top: 18%;
                        width: 4vw;
                        max-width: calc(100vh * 0.04);
                        aspect-ratio: 4 / 1;
                        animation-delay: 0.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(2) {
                        left: 15%;
                        top: 45%;
                        width: 20vw;
                        max-width: calc(100vh * 0.2);
                        aspect-ratio: 3 / 1;
                        animation-delay: 1s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(3) {
                        left: 10%;
                        top: 75%;
                        width: 26vw;
                        max-width: calc(100vh * 0.09);
                        aspect-ratio: 10 / 3;
                        animation-delay: 1.5s;
                        animation-name: pieceLeft;
                    }

                }


            }
        }

        // Container 2
        .two {
            .content {
                .piece {
                    background: $g-01;

                    &:nth-child(1) {
                        left: 0%;
                        top: 25%;
                        width: 16vw;
                        max-width: calc(100vh * 0.16);
                        aspect-ratio: 3 / 1;
                        animation-delay: 2s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(2) {
                        right: 15%;
                        top: 35%;
                        width: 24vw;
                        max-width: calc(100vh * 0.24);
                        aspect-ratio: 2 / 1;
                        animation-delay: 2.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(3) {
                        right: 10%;
                        top: 80%;

                        width: 21vw;
                        max-width: calc(100vh * 0.21);
                        aspect-ratio: 10 / 1.5;
                        animation-delay: 3s;
                        animation-name: pieceRight;
                    }

                }
            }
        }

        // Container 3
        .three {
            .content {
                .piece {
                    background: $m-01;

                    &:nth-child(1) {
                        left: 25%;
                        top: 35%;
                        width: 11vw;
                        max-width: calc(100vh * 0.11);
                        aspect-ratio: 4 / 1;
                        animation-name: pieceLeft;
                        animation-delay: 3.5s;
                    }

                    &:nth-child(2) {
                        right: 10%;
                        top: 55%;
                        width: 18vw;
                        max-width: calc(100vh * 0.18);
                        aspect-ratio: 10/ 3;
                        animation-name: pieceRight;
                        animation-delay: 4s;
                    }

                    &:nth-child(3) {
                        left: 40%;
                        top: 68%;
                        width: 11vw;
                        max-width: calc(100vh * 0.11);
                        aspect-ratio: 4 / 1;
                        animation-name: pieceLeft;
                        animation-delay: 4.5s;
                    }

                }


            }
        }


    }
}

</style>