document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.id-container');

    containers.forEach((container) => {
        const trigger = container.querySelector('.id-trigger');
        const panel = container.querySelector('.id-panel');
        const copyBtn = container.querySelector('.id-copy');
        const idValue = container.dataset.idValue;

        if (!trigger || !panel) return;

        // Toggle panel on trigger click
        trigger.addEventListener('click', function (evt) {
            evt.preventDefault();

            // Close any other open panels first
            containers.forEach((otherContainer) => {
                if (otherContainer !== container) {
                    const otherPanel = otherContainer.querySelector('.id-panel');
                    const otherTrigger = otherContainer.querySelector('.id-trigger');
                    if (otherPanel) {
                        otherPanel.classList.remove('open');
                        if (otherTrigger) otherTrigger.classList.remove('panel-open');
                    }
                }
            });

            panel.classList.toggle('open');
            trigger.classList.toggle('panel-open');
        });

        // Close panel if user clicks outside
        document.addEventListener('click', function (evt) {
            if (
                panel.classList.contains('open') &&
                !panel.contains(evt.target) &&
                !trigger.contains(evt.target)
            ) {
                panel.classList.remove('open');
                trigger.classList.remove('panel-open');
            }
        });

        // Copy button functionality
        if (copyBtn && idValue) {
            copyBtn.addEventListener('click', function () {
                navigator.clipboard.writeText(idValue).then(function () {
                    // Show success feedback
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    copyBtn.classList.add('copied');

                    setTimeout(function () {
                        copyBtn.textContent = originalText;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(function (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = idValue;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyBtn.textContent = 'Copied!';
                        copyBtn.classList.add('copied');
                        setTimeout(function () {
                            copyBtn.textContent = 'Copy';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    } catch (e) {
                        copyBtn.textContent = 'Failed';
                    }
                    document.body.removeChild(textArea);
                });
            });
        }
    });
});