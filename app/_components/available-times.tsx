const AvailableTimes = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between pb-1.5 pt-5">
        <p className="text-sm text-gray-400">Segunda-Feira</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">fechado</p>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <p className="text-sm text-gray-400">Terça-Feira</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">09:00 - 20:00</p>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <p className="text-sm text-gray-400">Quarta-Feira</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">09:00 - 20:00</p>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <p className="text-sm text-gray-400">Quinta-Feira</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">09:00 - 20:00</p>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <p className="text-sm text-gray-400">Sexta-Feira</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">09:00 - 20:00</p>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <p className="text-sm text-gray-400">Sábado</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">09:00 - 17:00</p>
      </div>
      <div className="flex items-center justify-between pb-5 pt-1.5">
        <p className="text-sm text-gray-400">Domingo</p>
        {/* <p className="text-sm">{format(selectedDate, "HH:mm")}</p> */}
        <p className="text-sm">fechado</p>
      </div>
    </div>
  )
}

export default AvailableTimes
