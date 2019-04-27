class TemperaturesController < ApplicationController

  def index
    @temperatures = Temperature.all
    render json: @temperatures
  end

  def show
    @temperature = Temperature.find(params[:id])
    render json: @temperature
  end

  def filter_one_date
   @temperatures = Temperature.all
   temperature = @temperatures.select{ |temp| temp.time.include?(params[:date]) }
   render json: temperature
  end
end
