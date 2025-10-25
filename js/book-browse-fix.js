    /**
     * Handle browse actions
     */
    handleBrowseAction(roomId, objectName, isActive) {
        const objectData = this.rooms[roomId].objects[objectName];
        console.log(`📖 Browsing ${objectData.name}...`);
        
        // Special handling for book in living room
        if (roomId === 'living-room' && objectName === 'book') {
            if (window.bookWindow) {
                window.bookWindow.showBookWindow();
            } else {
                console.log('❌ Book window system not available');
                this.showMessage(`Exploring ${objectData.name}...`);
            }
        } else {
            this.showMessage(`Exploring ${objectData.name}...`);
        }
    }

