const cls = (cls, el = div) => el.getElementsByClassName(cls)
const wm = new WeakMap() 
const Modal = {
	_wm: wm,
	getState: div => {
		let state = wm.get(div)
		if (!state) {
			state = {fnshows:[], fnhides:[], is: false}
			wm.set(div, state)
		}
		return state
	},
	is: div => {
		const state = Modal.getState(div)
		return state.is
	},
	hide: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.remove('show')
		const state = Modal.getState(div)
		state.is = false
		for (const fnhide of state.fnhides) fnhide()
	},
	show: div => {
		const modal = cls('popupmodal', div)[0]
		modal.classList.add('show')
		const state = Modal.getState(div)
		state.is = true
		for (const fnshow of state.fnshows) fnshow()
	},
	showhide: (div, fnshow, fnhide) => {
		const state = Modal.getState(div)
		if (fnshow) state.fnshows.push(fnshow)
		if (fnhide) state.fnhides.push(fnhide)
	}
}
window.Modal = Modal;
export { Modal }