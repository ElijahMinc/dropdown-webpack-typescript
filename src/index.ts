// @ts-nocheck
import './style.css'
import DropDown, { DropDownConfig, IData } from "./createConfig"

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
}) as DropDownConfig

new DropDown({
   name: 'DropDown',
   placeholder: 'Select value',
   componentNameByID: '#dropdown2',
   data,
}) as DropDownConfig