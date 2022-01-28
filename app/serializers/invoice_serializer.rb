class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :description, :client_name, :client_email, :status, :due_date, :logo, :item, :price
  has_one :user
end
