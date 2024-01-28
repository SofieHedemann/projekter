const draggables = document.querySelectorAll('.icons');
const originalEmptybox = document.querySelector('.emptybox');
const container = document.querySelector('.drag-container');

let emptyboxCount = 78;

// Clone and append empty boxes
for (let i = 0; i < emptyboxCount; i++) {
  const clone = originalEmptybox.cloneNode(true);
  container.appendChild(clone);
}

const emptyboxes = document.querySelectorAll('.emptybox');

emptyboxes.forEach(emptybox => {
  emptybox.addEventListener('dragover', e => {
    e.preventDefault();
    emptybox.classList.add('hovered');
  });

  emptybox.addEventListener('dragleave', () => {
    emptybox.classList.remove('hovered');
  });

  emptybox.addEventListener('drop', () => {
    const draggedElement = document.querySelector('.dragging');
    emptybox.appendChild(draggedElement);
    emptybox.classList.remove('hovered');
  });
});

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

// draggables.forEach((draggable) => {
//   //Når det draggable icon bliver hivet over en box 
//   draggable.addEventListener("dragstart", (e) => {
//     e.preventDefault(); // prevents default behavior
//     draggable.classList.add("hovered");
//   });

//   // Når ikoner forlader sin normale plads
//   draggable.addEventListener("dragend", () =>{
//     draggable.classList.remove("hovered");
//   });

//   // Når ikonet bliver smidt i en ny kasse
//   draggable.addEventListener("drop", () => {
//     // Append the draggable element to the empty box
//     const hoveredBox = document.querySelector('.hovered');
//     if (hoveredBox) {
//       hoveredBox.appendChild(draggable);
//       draggable.classList.remove("hovered");
//     }
//   });
// })