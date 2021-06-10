const cls = (cls, el = div) => el.getElementsByClassName(cls)
const Modal = {
	hide: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.remove('show')
	},
	show: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.add('show')			
	}
}

export { Modal }