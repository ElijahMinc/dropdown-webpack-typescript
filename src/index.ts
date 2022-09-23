import './style.css'
import DropDown, { IData } from "./select-lib/createConfig"

const data: IData[] = [
   {
      id: 1,
      title: 'React'
   },
   {
      id: 2,
      title: 'Vue'
   },
   {
      id: 3,
      title: 'Angular'
   }
]

new DropDown({
   name: 'DropDown',
   placeholder: 'Select value',
   componentNameByID: '#dropdown1',
   data,
})

// new DropDown({
//    name: 'DropDown',
//    placeholder: 'Select value',
//    componentNameByID: '#dropdown2',
//    data,
// }) as DropDownConfig