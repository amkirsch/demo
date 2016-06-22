json.array!(@resources) do |resource|
  json.extract! resource, :id, :name, :resource_type, :properties, :actions
  json.url resource_url(resource, format: :json)
end
