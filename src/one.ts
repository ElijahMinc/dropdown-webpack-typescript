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
export default new DropDown({
   name: 'DropDown',
   placeholder: 'Select value',
   componentNameByID: '#element',
   data,
}) as DropDownConfig