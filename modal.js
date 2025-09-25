/**
 * Reusable Modal Component
 * 
 * This script injects a modal into the DOM and provides a global function
 * `showModal(title, message, type)` to display it.
 * 
 * @param {string} title - The title to display in the modal.
 * @param {string} message - The body text of the modal.
 * @param {string} [type='error'] - The type of modal ('error', 'success', 'info').
 * @param {function} [callback] - An optional function to run after the modal is closed.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject the modal HTML into the body
    const modalHTML = `
        <div id="reusableModal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <i id="modalIcon" class="fas modal-icon"></i>
                <h2 id="modalTitle"></h2>
                <p id="modalMessage"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('reusableModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = modal.querySelector('.close-button');
    let afterCloseCallback = null;

    function closeModal() {
        modal.style.display = 'none';
        if (typeof afterCloseCallback === 'function') {
            afterCloseCallback();
        }
    }

    // Assign the showModal function to the window object to make it globally accessible
    window.showModal = function(title, message, type = 'error', callback = null) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        afterCloseCallback = callback;

        // Reset classes
        modalContent.className = 'modal-content';
        modalIcon.className = 'fas modal-icon';

        // Apply type-specific classes and icons
        if (type === 'success') {
            modalContent.classList.add('success');
            modalIcon.classList.add('fa-check-circle', 'success');
        } else if (type === 'info') {
            modalContent.classList.add('info');
            modalIcon.classList.add('fa-info-circle', 'info');
        } else { // 'error' is the default
            modalIcon.classList.add('fa-exclamation-triangle');
        }

        modal.style.display = 'block';
    };

    // Event listeners for closing the modal
    closeBtn.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
});