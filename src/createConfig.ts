export interface IData {
   id: number
   title: string
}

enum classNames {
   SHOW = 'show',
   ACTIVE = 'active',
   DROPDOWN_CHILDREN = '.dropdown-field__item'
}
enum DROPDOWN_ELEMENT {
   DROPDOWN = '[data-type="dropdown"]',
   INPUT = '[data-type="input"]',
   ICON = '[data-type="icon"]',
   BACKDROP = '[data-type="backdrop"]'
}
enum DROPDOWN_NAME_ELEMENTs {
   DROPDOWN = 'dropdown',
   DROPDOWN_BODY = 'body',
   INPUT = 'input',
   ICON = 'icon',
   BACKDROP = 'backdrop'
}
export interface IDropDown<T> {
   name: string
   placeholder: string
   data: T[]
   readonly componentNameByID: string
}

export type DropDownConfig = InstanceType<typeof DropDown>


interface DropDownConfigurationProps{
   readonly $component: Element
}

class DropDown<T extends IData> implements DropDownConfigurationProps{
   constructor(
         public config: IDropDown<T>, 
         public name: string = config.name,
         public data: T[] = config.data,
         public placeholder: string = config.placeholder,
         readonly componentNameByID = config.componentNameByID,
         readonly $component = document.querySelector(componentNameByID),
      ){
         this.render()
         this.setup()
      }
      private liItemTemplate({id, title}: T ) {
         return `<li class="dropdown-field__item" data-key="${id}-${title}">${title}</li>`
      }
      // <div class="backdrop" data-type="backdrop"></div>
      private template() {
            return `
            <div class="backdrop"></div>
            <div class="dropdown__container">
              <div class="dropdown__item dropdown-body" data-type="body">
                 <div class="dropdown-body__item" data-type="input">${this.placeholder}</div>
                 <i class="fas fa-sort-down dropdown-body__item dropdown-body__item-icon" data-type="icon"></i>
                 <ul class="dropdown__item dropdown-field" data-type="dropdown">
                    ${this.data.map((currentData: T) => (
                       this.liItemTemplate(currentData)
                    )).join(' ')}
                 </ul>
              </div>
           </div>
           `
      }
      get isShow(): boolean{
        return  !!(<HTMLElement>this.$component).classList.contains(classNames.SHOW)
      }
      public show = (): void => {
         (<HTMLElement>this.$component).classList.add(classNames.SHOW)
      }
      public hide = (): void => (<HTMLElement>this.$component).classList.remove(classNames.SHOW)
      public toggleOpen = (): void => this.isShow ? this.hide() : this.show()

      handleSetup = (event: Event, toggleOpen: () => void, hide: () => void): void => {
         const target = (<HTMLElement>event.target)
         const COMPONENT_MAIN = event.currentTarget as HTMLElement
         const input = (<HTMLElement>COMPONENT_MAIN.querySelector(DROPDOWN_ELEMENT.INPUT))
         const dropdownChilds = (<HTMLElement>COMPONENT_MAIN
            .querySelector(DROPDOWN_ELEMENT.DROPDOWN))
            .querySelectorAll(classNames.DROPDOWN_CHILDREN)
         const isChildrenDropdown = target.closest(DROPDOWN_ELEMENT.DROPDOWN)

         switch (target.dataset.type) {
            case DROPDOWN_NAME_ELEMENTs.BACKDROP:
                  hide()
               break;
            case  DROPDOWN_NAME_ELEMENTs.DROPDOWN_BODY:
                   toggleOpen() 
               break;
            case  DROPDOWN_NAME_ELEMENTs.INPUT:
                  toggleOpen()
               break;
            case  DROPDOWN_NAME_ELEMENTs.ICON:
                  toggleOpen() 
               break;
            default:
                  hide()
                  break;
         }
         if(isChildrenDropdown){
            dropdownChilds.forEach(dropDownChild => 
               dropDownChild.classList.remove(classNames.ACTIVE))
            target.classList.add(classNames.ACTIVE)
            input.innerText = target.innerText
         }
      }
      private setup()  {
         this.$component.addEventListener('click', () => this.handleSetup(event, this.toggleOpen, this.hide))
      }
      private render() {
          this.$component.classList.add('dropdown')
          this.$component.innerHTML = this.template()
      }
}
export default DropDown