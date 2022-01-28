class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :description, :client_name, :client_email, :status, :due_date, :logo
  has_one :user
end
