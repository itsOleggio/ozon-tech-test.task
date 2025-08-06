import { ProgressComponent } from '../components/progress/progress.js';

document.addEventListener("DOMContentLoaded", async () => {
    const progress = await ProgressComponent.create({
        root: document.getElementById('progress-container')
    });

    progress.setValue(50);
    progress.setAnimated(true);
    progress.setHidden(false);

    // Дописал дополнительные методы, что в примере скрыть это меню
    progress.setMenuVisible(true);
});
