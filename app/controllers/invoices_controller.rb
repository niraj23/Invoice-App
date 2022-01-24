class InvoicesController < ApplicationController
  
  def index
    render json: Invoice.all
  end

  def show
    invoice = Invoice.find_by(id:params[:id])
    render json: invoice, status: :ok
  end

  def create
    invoice = @current_user.invoices.create!(invoice_params)
    render json: invoice, status: :created
  end

  def destroy
    invoice = Invoice.find_by(id: params[:id])
    invoice.destroy
    head :no_content
end

  private

  def invoice_params
    params.permit(:id, :description, :client_name, :client_email, :status, :due_date)
  end

end
