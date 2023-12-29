<script>
    export let selectedImage = null;
    export let onClose;
    import { fade } from "svelte/transition";

    // Function to close the image viewer
    function closeViewer() {
        if (onClose) onClose();
    }
</script>

{#if selectedImage}
    <div class="image-viewer-overlay" on:click={closeViewer} in:fade out:fade>
        <div class="image-viewer-content" on:click|stopPropagation>
            <img src={selectedImage.url} alt={selectedImage.prompt} />

            <div class="prompt-overlay">
                {selectedImage.prompt}
            </div>
        </div>
    </div>
{/if}

<style>
    .prompt-overlay {
        color: white;
    }

    .image-viewer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .image-viewer-content {
        max-width: 80%;
        max-height: 80%;
        /* Ensure the content doesn't stretch to the edges */
    }

    @media (min-width: 768px) {
        .image-viewer-content {
            max-width: 30%;
            max-height: 30%;
        }
    }

    .image-viewer-content img {
        width: 80%;
        height: auto;
        /* Ensure the image doesn't overflow the viewer */
        max-height: 100%;
        z-index: 1001;
    }
</style>
