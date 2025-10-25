/**
 * Fantasy OS - DOM Helper Utilities
 * Utility functions for DOM manipulation and element management
 * Created: 2025-10-25T12:07:56.000Z
 */

class DOMHelpers {
    /**
     * Get element by ID with error handling
     */
    static getElementById(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID '${id}' not found`);
        }
        return element;
    }
    
    /**
     * Get elements by class name
     */
    static getElementsByClassName(className, parent = document) {
        return Array.from(parent.getElementsByClassName(className));
    }
    
    /**
     * Get elements by selector
     */
    static querySelector(selector, parent = document) {
        return parent.querySelector(selector);
    }
    
    /**
     * Get all elements by selector
     */
    static querySelectorAll(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }
    
    /**
     * Create element with attributes and content
     */
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Set content
        if (content) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof HTMLElement) {
                element.appendChild(content);
            } else if (Array.isArray(content)) {
                content.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else if (child instanceof HTMLElement) {
                        element.appendChild(child);
                    }
                });
            }
        }
        
        return element;
    }
    
    /**
     * Add class to element
     */
    static addClass(element, className) {
        if (element && element.classList) {
            element.classList.add(className);
        }
    }
    
    /**
     * Remove class from element
     */
    static removeClass(element, className) {
        if (element && element.classList) {
            element.classList.remove(className);
        }
    }
    
    /**
     * Toggle class on element
     */
    static toggleClass(element, className) {
        if (element && element.classList) {
            element.classList.toggle(className);
        }
    }
    
    /**
     * Check if element has class
     */
    static hasClass(element, className) {
        return element && element.classList && element.classList.contains(className);
    }
    
    /**
     * Set element style
     */
    static setStyle(element, property, value) {
        if (element && element.style) {
            element.style[property] = value;
        }
    }
    
    /**
     * Set multiple styles on element
     */
    static setStyles(element, styles) {
        if (element && element.style) {
            Object.entries(styles).forEach(([property, value]) => {
                element.style[property] = value;
            });
        }
    }
    
    /**
     * Get element style
     */
    static getStyle(element, property) {
        if (element && element.style) {
            return element.style[property];
        }
        return null;
    }
    
    /**
     * Show element
     */
    static show(element) {
        if (element) {
            element.style.display = '';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        }
    }
    
    /**
     * Hide element
     */
    static hide(element) {
        if (element) {
            element.style.display = 'none';
        }
    }
    
    /**
     * Toggle element visibility
     */
    static toggleVisibility(element) {
        if (element) {
            if (element.style.display === 'none') {
                this.show(element);
            } else {
                this.hide(element);
            }
        }
    }
    
    /**
     * Add event listener with automatic cleanup
     */
    static addEventListener(element, event, handler, options = {}) {
        if (element) {
            element.addEventListener(event, handler, options);
            
            // Return cleanup function
            return () => {
                element.removeEventListener(event, handler, options);
            };
        }
        return () => {};
    }
    
    /**
     * Remove event listener
     */
    static removeEventListener(element, event, handler, options = {}) {
        if (element) {
            element.removeEventListener(event, handler, options);
        }
    }
    
    /**
     * Add event listener to multiple elements
     */
    static addEventListenerToAll(elements, event, handler, options = {}) {
        const cleanupFunctions = [];
        
        elements.forEach(element => {
            const cleanup = this.addEventListener(element, event, handler, options);
            cleanupFunctions.push(cleanup);
        });
        
        // Return cleanup function for all listeners
        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }
    
    /**
     * Delegate event to parent element
     */
    static delegateEvent(parent, selector, event, handler) {
        if (parent) {
            const delegatedHandler = (e) => {
                if (e.target.matches(selector)) {
                    handler.call(e.target, e);
                }
            };
            
            parent.addEventListener(event, delegatedHandler);
            
            // Return cleanup function
            return () => {
                parent.removeEventListener(event, delegatedHandler);
            };
        }
        return () => {};
    }
    
    /**
     * Animate element with CSS transitions
     */
    static animate(element, properties, duration = 300, easing = 'ease-in-out') {
        if (!element) return Promise.resolve();
        
        return new Promise((resolve) => {
            // Set transition
            element.style.transition = `all ${duration}ms ${easing}`;
            
            // Apply properties
            Object.entries(properties).forEach(([property, value]) => {
                element.style[property] = value;
            });
            
            // Clean up after animation
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }
    
    /**
     * Fade in element
     */
    static fadeIn(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        element.style.opacity = '0';
        element.style.display = '';
        
        return this.animate(element, { opacity: '1' }, duration);
    }
    
    /**
     * Fade out element
     */
    static fadeOut(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, { opacity: '0' }, duration).then(() => {
            element.style.display = 'none';
        });
    }
    
    /**
     * Slide down element
     */
    static slideDown(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = '';
        
        const height = element.scrollHeight;
        
        return this.animate(element, { height: `${height}px` }, duration).then(() => {
            element.style.height = '';
            element.style.overflow = '';
        });
    }
    
    /**
     * Slide up element
     */
    static slideUp(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        const height = element.offsetHeight;
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        
        return this.animate(element, { height: '0' }, duration).then(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
        });
    }
    
    /**
     * Get element position relative to viewport
     */
    static getPosition(element) {
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2
        };
    }
    
    /**
     * Check if element is in viewport
     */
    static isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Scroll element into view
     */
    static scrollIntoView(element, options = {}) {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
                ...options
            });
        }
    }
    
    /**
     * Get computed style of element
     */
    static getComputedStyle(element, property) {
        if (element) {
            const computedStyle = window.getComputedStyle(element);
            return property ? computedStyle[property] : computedStyle;
        }
        return null;
    }
    
    /**
     * Wait for element to be available
     */
    static waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            
            const observer = new MutationObserver((mutations) => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element '${selector}' not found within ${timeout}ms`));
            }, timeout);
        });
    }
    
    /**
     * Create and show toast notification
     */
    static showToast(message, type = 'info', duration = 3000) {
        const toast = this.createElement('div', {
            className: `fantasy-toast fantasy-toast-${type}`,
            textContent: message
        });
        
        // Style the toast
        this.setStyles(toast, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'var(--fantasy-font-ui)',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease-out'
        });
        
        // Set background color based on type
        const colors = {
            info: 'var(--fantasy-cool-blue)',
            success: 'var(--fantasy-earth-green)',
            warning: 'var(--fantasy-warm-orange)',
            error: 'var(--fantasy-warm-red)'
        };
        
        toast.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            this.setStyles(toast, {
                opacity: '1',
                transform: 'translateX(0)'
            });
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            this.setStyles(toast, {
                opacity: '0',
                transform: 'translateX(100%)'
            });
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
        
        return toast;
    }
    
    /**
     * Create modal dialog
     */
    static createModal(title, content, options = {}) {
        const modal = this.createElement('div', { className: 'fantasy-modal' });
        const modalContent = this.createElement('div', { className: 'fantasy-modal-content' });
        
        const header = this.createElement('div', { className: 'fantasy-modal-header' });
        const titleElement = this.createElement('h2', { 
            className: 'fantasy-modal-title', 
            textContent: title 
        });
        const closeButton = this.createElement('button', { 
            className: 'fantasy-modal-close',
            textContent: '×'
        });
        
        const body = this.createElement('div', { className: 'fantasy-modal-body' });
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.appendChild(content);
        }
        
        header.appendChild(titleElement);
        header.appendChild(closeButton);
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modal.appendChild(modalContent);
        
        // Add close functionality
        const closeModal = () => {
            this.removeClass(modal, 'active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
        
        this.addEventListener(closeButton, 'click', closeModal);
        this.addEventListener(modal, 'click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            this.addClass(modal, 'active');
        }, 10);
        
        return { modal, closeModal };
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOMHelpers;
}
