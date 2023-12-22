<script>
    import { onMount } from "svelte";
    import DoodleInput from "./DoodleInput.svelte";
    import Title from "./Title.svelte";
    import GenerationOutput from "./GenerationOutput.svelte";
    import Gallery from "./Gallery.svelte";

    let password = "";
    const correctHash = 108301; // This should be the hash of the correct password

    const hash = (s) => {
        return s.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
    };

    let isAuthorized = false;

    $: isAuthorized = hash(password) === correctHash;

    onMount(() => {
        password = ""; // Clear password on component mount
    });
</script>

<div class="app">
    {#if isAuthorized}
        <Title />
        <DoodleInput />
        <GenerationOutput />
        <Gallery />
    {:else}
        <form>
            <input hidden type="text" autocomplete="username" value="" />
            <label for="password">password:</label>
            <input
                id="password"
                bind:value={password}
                type="password"
                autocomplete="current-password"
            />
        </form>
    {/if}
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Shantell Sans", sans-serif;
        margin: auto;
        text-align: center;
        font-weight: bold;
    }

    form {
        font-family: "Shantell Sans", sans-serif;
        font-size: 16px;
        margin: auto;
        margin-top: 100px;
        text-align: center;
        font-weight: bold;
    }

    input[type="password"] {
        width: 200px;
    }
</style>

