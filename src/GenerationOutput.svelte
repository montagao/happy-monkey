<!-- GenerationOutput.svelte -->
<script>
    import { generatedImageUrl, isGenerating, isError } from "./store.js";
    import { SpinLine } from "svelte-loading-spinners";

    const loadingTemplates = [
        "wrinkling monkey brain...",
        "hohoho",
        "moooooo",
        "watching grass grow",
        "看煮粥",
        "🐒",
        "🐵",
        "🙈",
        "🙉",
        "🙊",
    ];

    // Function to get a random loading message
    function getRandomLoadingMessage() {
        const randomIndex = Math.floor(Math.random() * loadingTemplates.length);
        return loadingTemplates[randomIndex];
    }

    // Get a random loading message
    let randomLoadingMessage = getRandomLoadingMessage();
</script>

{#if $generatedImageUrl}
    <div class="generation-output">
        <img src={$generatedImageUrl} alt="Generated Monkey Art" />
    </div>
{:else if $isGenerating}
    <div class="generation-output">
        <SpinLine size="60" color="#FF3E00" unit="px" duration="1s" />
        <br />
        <p>{randomLoadingMessage}</p>
    </div>
{:else if $isError}
    <div class="generation-output">
        <p>something dun goofed. let monta know.</p>
    </div>
{/if}

<style>
    .generation-output {
        transition: all 0.5s ease-in-out;
        /* Add styles here to match your design */
        width: 300px; /* Adjust size as needed */
        height: 300px; /* Adjust size as needed */
        border: 1px solid #ccc; /* Example border, adjust as needed */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 1rem;
    }

    .generation-output img {
        max-width: 100%;
        max-height: 100%;
    }
</style>

