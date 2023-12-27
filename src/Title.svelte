<!-- Title.svelte -->
<script>
    export let title = "monkey doodler";
    export let subtitle = "merry christmas - Monta 🎄";
    import { onMount } from "svelte";

    onMount(() => {
        const letters = document.querySelectorAll(".letter");
        letters.forEach((letter, index) => {
            letter.style.setProperty("--i", index);
        });
    });
</script>

<div class="title">
    <h1>
        {#each title.split("") as letter}
            <span class="letter">{letter}</span>
        {/each} ✍
    </h1>
    <h2 class="christmas-tree">joyeux noël - Monta 🎄</h2>
    <!--
    <h2 class="christmas-tree">
        {#each subtitle.split("") as letter}
            <span class="letter">{letter}</span>
        {/each}
    </h2>
    -->
</div>

<style>
    .christmas-tree,
    .title {
        font-family: "Shantell Sans", sans-serif;
        color: #000;
        text-align: center;
        margin-top: 20px;
    }

    .letter {
        display: inline-block;
        opacity: 0;
        transform: translateY(-20px);
        animation: doodle 0.5s forwards;
    }

    @keyframes doodle {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .title h1 .letter,
    .christmas-tree h2 .letter {
        animation-delay: calc(0.1s * var(--i));
    }
</style>

