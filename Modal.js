const cls = (cls, el = div) => el.getElementsByClassName(cls)
const wm = new WeakMap() 
const Modal = {
	_wm: wm,
	getState: modal => {
		let state = wm.get(modal)
		if (!state) {
			state = {fnshows:[], fnhides:[], is: false, lastfocus: false}
			wm.set(modal, state)
		}
		return state
	},
	is: div => {
		const modal = cls('popupmodal', div)[0]
		const state = Modal.getState(modal)
		return state.is
	},
	hide: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.remove('show')
		const state = Modal.getState(modal)
		state.is = false
		if (state.lastfocus) {
			state.lastfocus.focus({ preventScroll: true })
		}
		for (const fnhide of state.fnhides) fnhide()
	},
	show: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.add('show')
		const close = cls('close', modal)[0]
		const state = Modal.getState(modal)
		state.is = true		
		state.lastfocus = document.activeElement
		modal.focus({ preventScroll: true })
		for (const fnshow of state.fnshows) fnshow()
	},
	showhide: (div, fnshow, fnhide) => {
		const modal = cls('popupmodal', div)[0]
		const state = Modal.getState(modal)
		if (fnshow) state.fnshows.push(fnshow)
		if (fnhide) state.fnhides.push(fnhide)
	}
}
window.Modal = Modal;
export { Modal }