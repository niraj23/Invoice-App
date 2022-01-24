require "rails_helper"

RSpec.describe "Invoices", type: :request do
  let!(:user) { User.create(username: "test_user", password: "sup3r-secret", image_url: "https://via.placeholder.com/150", bio: "bio") }
  
  describe "GET /invoices" do

    before do 
      Invoice.create([
        {
          user_id: user.id,
          title: "Rice", 
          instructions: "Measure 1 cup of rice in bowl of rice cooker. Wash rice. Fill with water to level indicated by manufacturer. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
          minutes_to_complete: 10
        },
        {
          user_id: user.id,
          title: "Burnt Rice", 
          instructions: "Measure 1 cup of rice in bowl of rice cooker. Don't add any water. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
          minutes_to_complete: 10
        }
      ])
    end

    context "with a logged in user" do
      before do
        post "/login", params: { username: user.username, password: user.password }
      end
      
      it "returns an array of invoices with their associated users" do
        get "/invoices"

        expect(response.body).to include_json([
          {
            id: a_kind_of(Integer),
            title: "Rice", 
            instructions: "Measure 1 cup of rice in bowl of rice cooker. Wash rice. Fill with water to level indicated by manufacturer. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
            minutes_to_complete: 10,
            user: {
              username: user.username,
              image_url: user.image_url,
              bio: user.bio
            }
          },
          {
            id: a_kind_of(Integer),
            title: "Burnt Rice", 
            instructions: "Measure 1 cup of rice in bowl of rice cooker. Don't add any water. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
            minutes_to_complete: 10,
            user: {
              username: user.username,
              image_url: user.image_url,
              bio: user.bio
            }
          }
        ])
      end
    end

    context "with no logged in user" do

      it "returns an array of error messages in the body" do
        get "/invoices"

        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it "returns a 401 (Unauthorized) HTTP status code" do
        post "/invoices"

        expect(response).to have_http_status(:unauthorized)
      end
      
    end
  end

  describe "POST /invoices" do

    context "with a logged in user and valid data" do
      let!(:invoice_params) do 
        { 
          title: "Rice", 
          instructions: "Measure 1 cup of rice in bowl of rice cooker. Wash rice. Fill with water to level indicated by manufacturer. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
          minutes_to_complete: 10
        }
      end 

      before do
        post "/login", params: { username: user.username, password: user.password }
      end

      it "creates a new invoice in the database" do
        expect { post "/invoices", params: invoice_params }.to change(Invoice, :count).by(1)
      end

      it "returns the new invoice along with its associated user" do
        post "/invoices", params: invoice_params

        expect(response.body).to include_json({
          id: a_kind_of(Integer),
          title: "Rice", 
          instructions: "Measure 1 cup of rice in bowl of rice cooker. Wash rice. Fill with water to level indicated by manufacturer. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
          minutes_to_complete: 10,
          user: {
            username: user.username,
            image_url: user.image_url,
            bio: user.bio
          }
        })
      end

      it "returns a 201 (Created) HTTP status code" do
        post "/invoices", params: invoice_params

        expect(response).to have_http_status(:created)
      end
      
    end

    context "with a logged in user and invalid data" do
      let!(:invoice_params) do 
        { 
          instructions: "This is too short",
          minutes_to_complete: 10
        }
      end 

      before do
        post "/login", params: { username: user.username, password: user.password }
      end

      it "does not create a new invoice in the database" do
        expect { post "/invoices", params: invoice_params }.not_to change(Invoice, :count)
      end

      it "returns an array of validation error messsages" do
        post "/invoices", params: invoice_params

        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it "returns a 422 (Unprocessable Entity) HTTP status code" do
        post "/invoices", params: invoice_params

        expect(response).to have_http_status(:unprocessable_entity)
      end
      
    end

    context "with no logged in user" do

      it "returns an array of error messages in the body" do
        post "/invoices"

        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it "returns a 401 (Unauthorized) HTTP status code" do
        post "/invoices"

        expect(response).to have_http_status(:unauthorized)
      end
      
    end

  end
  
end
