class TransactionsController < ApplicationController
  
    def index
      render json: Transaction.all
    end
  
    def show
      transaction = Transaction.find_by(id:params[:id])
      render json: transaction, status: :ok
    end
  
    def create
      transaction = @current_user.transactions.create!(transaction_params)
      render json: transaction, status: :created
    end
  
    def destroy
      transaction = Transaction.find_by(id: params[:id])
      transaction.destroy
      head :no_content
  end
  
    private
  
    def transaction_params
      params.permit(:id, :item, :price)
    end
  end