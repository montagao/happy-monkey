<!-- Footer.svelte -->
<script>
    const githubUrl = 'https://github.com/montagao/happy-monkey';
</script>

<footer class="footer">
    <div class="content">
        <p>
            fork me on 
            <a href={githubUrl} target="_blank">github</a>!
        </p>
    </div>
</footer>

<style>
    .footer {
        padding: 20px;
        background-color: #f5f5f5;
        text-align: center;
        bottom: 0;
        width: 100%;
    }

    .footer .content {
        margin: auto;
        max-width: 960px;
    }

    .footer a {
        color: #0076d6;
        text-decoration: none;
    }

    .footer a:hover {
        text-decoration: underline;
    }
</style>

